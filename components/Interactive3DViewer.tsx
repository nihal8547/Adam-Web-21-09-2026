"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";

export type ModelType = "hvac" | "leak";

interface Hotspot {
  id: string;
  name: string;
  description: string;
  position: THREE.Vector3;
}

const HVAC_HOTSPOTS: Hotspot[] = [
  {
    id: "compressor",
    name: "Dual Screw Compressors",
    description: "High-efficiency variable-capacity refrigeration compressors engineered for Qatar's ambient 50°C temperatures.",
    position: new THREE.Vector3(-0.6, 0.4, 0.5),
  },
  {
    id: "evaporator",
    name: "Shell & Tube Evaporator",
    description: "Insulated chiller barrel delivering precise 6°C chilled water for central air handling units.",
    position: new THREE.Vector3(0, -0.4, 0),
  },
  {
    id: "fans",
    name: "Aero-Foil Condenser Fans",
    description: "Dual dynamic high-static pressure fans expelling rejected heat with optimized acoustic dampers.",
    position: new THREE.Vector3(0, 1.25, 0),
  },
  {
    id: "controller",
    name: "Digital BMS Microprocessor",
    description: "Direct Digital Control (DDC) module with Modbus integration and 24/7 remote performance monitoring.",
    position: new THREE.Vector3(0.95, 0.1, 0.65),
  },
];

const LEAK_HOTSPOTS: Hotspot[] = [
  {
    id: "sensor",
    name: "Acoustic Ground Geophone",
    description: "High-sensitivity piezoelectric hydrophone detecting acoustic vibrations through soil, asphalt, and concrete.",
    position: new THREE.Vector3(-0.8, -0.6, 0),
  },
  {
    id: "analyzer",
    name: "Digital Frequency Spectrum",
    description: "Real-time FFT audio visualizer filtering ambient noise from 100 Hz to 4,000 Hz leak frequencies.",
    position: new THREE.Vector3(0.6, 0.2, 0),
  },
  {
    id: "cable",
    name: "Shielded Telemetry Lead",
    description: "Heavy-duty coiled signal cable preventing RF interference from underground power lines.",
    position: new THREE.Vector3(-0.1, -0.2, 0),
  },
  {
    id: "pulses",
    name: "Subsurface Ultrasonic Radiance",
    description: "Pinpoint acoustic wave tracking isolating pressurized pipe breaches within ±5 cm without excavation.",
    position: new THREE.Vector3(-0.8, -1.0, 0),
  },
];

export default function Interactive3DViewer({
  modelType,
  className,
}: {
  modelType: ModelType;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [screenHotspots, setScreenHotspots] = useState<
    { hotspot: Hotspot; x: number; y: number; visible: boolean }[]
  >([]);
  const [isRotating, setIsRotating] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const fanBladesRef = useRef<THREE.Mesh[]>([]);
  const soundWavesRef = useRef<THREE.Mesh[]>([]);
  const spectrumBarsRef = useRef<THREE.Mesh[]>([]);
  const wireframeMaterialsRef = useRef<THREE.Material[]>([]);

  // Drag rotation state
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0.2, y: -0.6 });

  // Build HVAC Model
  const buildHVACModel = useCallback((scene: THREE.Scene) => {
    const group = new THREE.Group();
    fanBladesRef.current = [];
    wireframeMaterialsRef.current = [];

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x16294f,
      roughness: 0.35,
      metalness: 0.65,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x2b323c,
      roughness: 0.2,
      metalness: 0.85,
    });
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xc87d55,
      roughness: 0.25,
      metalness: 0.9,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.1,
      metalness: 0.95,
    });
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0a1429,
      emissive: 0x1e3a68,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.3,
      metalness: 0.7,
    });

    wireframeMaterialsRef.current.push(chassisMat, steelMat, copperMat, chromeMat, goldMat);

    // 1. Skid Frame (Base)
    const baseGeo = new THREE.BoxGeometry(2.4, 0.15, 1.4);
    const base = new THREE.Mesh(baseGeo, steelMat);
    base.position.y = -0.7;
    group.add(base);

    // Base structural crossbeams
    for (let i = -1; i <= 1; i += 0.5) {
      const beamGeo = new THREE.BoxGeometry(0.08, 0.1, 1.35);
      const beam = new THREE.Mesh(beamGeo, goldMat);
      beam.position.set(i, -0.6, 0);
      group.add(beam);
    }

    // 2. Chiller Barrel (Evaporator - Shell & Tube)
    const barrelGeo = new THREE.CylinderGeometry(0.38, 0.38, 2.1, 32);
    const barrel = new THREE.Mesh(barrelGeo, chassisMat);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0, -0.4, -0.1);
    group.add(barrel);

    // Insulation rings on barrel
    for (let x = -0.8; x <= 0.8; x += 0.4) {
      const ringGeo = new THREE.TorusGeometry(0.39, 0.02, 16, 32);
      const ring = new THREE.Mesh(ringGeo, goldMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.set(x, -0.4, -0.1);
      group.add(ring);
    }

    // Flange In/Out Pipes
    const inPipeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 16);
    const inPipe = new THREE.Mesh(inPipeGeo, steelMat);
    inPipe.position.set(-0.7, -0.1, -0.1);
    group.add(inPipe);

    const outPipe = new THREE.Mesh(inPipeGeo, steelMat);
    outPipe.position.set(0.7, -0.1, -0.1);
    group.add(outPipe);

    // Flange wheel valves (blue & red)
    const valveGeo = new THREE.TorusGeometry(0.12, 0.025, 12, 24);
    const valveBlueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
    const valveRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
    const valveBlue = new THREE.Mesh(valveGeo, valveBlueMat);
    valveBlue.rotation.x = Math.PI / 2;
    valveBlue.position.set(-0.7, 0.12, -0.1);
    group.add(valveBlue);

    const valveRed = new THREE.Mesh(valveGeo, valveRedMat);
    valveRed.rotation.x = Math.PI / 2;
    valveRed.position.set(0.7, 0.12, -0.1);
    group.add(valveRed);

    // 3. Compressors (Dual Canisters)
    [-0.55, 0.25].forEach((posX) => {
      const compGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.7, 24);
      const comp = new THREE.Mesh(compGeo, chassisMat);
      comp.position.set(posX, 0.15, 0.35);
      group.add(comp);

      const compCapGeo = new THREE.SphereGeometry(0.24, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const compCap = new THREE.Mesh(compCapGeo, steelMat);
      compCap.position.set(posX, 0.5, 0.35);
      group.add(compCap);

      // Copper discharge pipes connecting compressor to condenser
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(posX, 0.5, 0.35),
        new THREE.Vector3(posX, 0.8, 0.2),
        new THREE.Vector3(posX * 0.5, 0.95, -0.1),
      ]);
      const tubeGeo = new THREE.TubeGeometry(pipeCurve, 20, 0.035, 12, false);
      const tube = new THREE.Mesh(tubeGeo, copperMat);
      group.add(tube);
    });

    // 4. Overhead Condenser Coil Enclosure & V-Bank
    const coilFrameGeo = new THREE.BoxGeometry(2.3, 0.6, 1.25);
    const coilFrame = new THREE.Mesh(coilFrameGeo, steelMat);
    coilFrame.position.set(0, 0.9, 0);
    group.add(coilFrame);

    // Louvered grill texture on condenser sides
    for (let y = 0.65; y <= 1.15; y += 0.08) {
      const grillGeo = new THREE.BoxGeometry(2.28, 0.02, 1.27);
      const grill = new THREE.Mesh(grillGeo, chromeMat);
      grill.position.set(0, y, 0);
      group.add(grill);
    }

    // 5. Dual Overhead Condenser Fans
    [-0.55, 0.55].forEach((fanX) => {
      // Fan shroud / cowl
      const cowlGeo = new THREE.CylinderGeometry(0.42, 0.44, 0.15, 24, 1, true);
      const cowl = new THREE.Mesh(cowlGeo, steelMat);
      cowl.position.set(fanX, 1.25, 0);
      group.add(cowl);

      // Fan hub
      const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
      const hub = new THREE.Mesh(hubGeo, chromeMat);
      hub.position.set(fanX, 1.25, 0);
      group.add(hub);

      // Fan blades (4 blades)
      const bladeGroup = new THREE.Group();
      for (let b = 0; b < 4; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.32, 0.015, 0.07);
        const blade = new THREE.Mesh(bladeGeo, goldMat);
        blade.rotation.y = (b * Math.PI) / 2;
        blade.rotation.z = 0.2; // Pitch
        blade.position.set(Math.cos((b * Math.PI) / 2) * 0.18, 0, Math.sin((b * Math.PI) / 2) * 0.18);
        bladeGroup.add(blade);
      }
      bladeGroup.position.set(fanX, 1.25, 0);
      group.add(bladeGroup);
      fanBladesRef.current.push(bladeGroup as unknown as THREE.Mesh);
    });

    // 6. Microprocessor Control Panel
    const panelBoxGeo = new THREE.BoxGeometry(0.35, 0.55, 0.15);
    const panelBox = new THREE.Mesh(panelBoxGeo, chassisMat);
    panelBox.position.set(0.95, 0.15, 0.65);
    group.add(panelBox);

    const screenGeo = new THREE.PlaneGeometry(0.24, 0.28);
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0.95, 0.22, 0.73);
    group.add(screen);

    // Glowing LED status indicator
    const ledGeo = new THREE.SphereGeometry(0.02, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(0.95, 0.38, 0.73);
    group.add(led);

    // Ground shadow platform
    const shadowGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.02, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0a1429,
      transparent: true,
      opacity: 0.45,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.y = -0.78;
    group.add(shadow);

    // Compute bounding box and center perfectly at (0, 0, 0)
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.position.set(-center.x, -center.y, -center.z);

    const pivot = new THREE.Group();
    pivot.add(group);
    scene.add(pivot);
    modelGroupRef.current = pivot;
  }, []);

  // Build Acoustic Leak Detection Model
  const buildLeakDetectionModel = useCallback((scene: THREE.Scene) => {
    const group = new THREE.Group();
    soundWavesRef.current = [];
    spectrumBarsRef.current = [];
    wireframeMaterialsRef.current = [];

    // Materials
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.25,
      metalness: 0.85,
    });
    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.8,
      metalness: 0.1,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.1,
      metalness: 0.95,
    });
    const housingMat = new THREE.MeshStandardMaterial({
      color: 0x0f1e3d,
      roughness: 0.35,
      metalness: 0.5,
    });
    const screenGlowMat = new THREE.MeshStandardMaterial({
      color: 0x052e16,
      emissive: 0x10b981,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });

    wireframeMaterialsRef.current.push(brassMat, rubberMat, chromeMat, housingMat);

    // 1. Acoustic Ground Sensor (Geophone Bell Probe)
    const bellBaseGeo = new THREE.CylinderGeometry(0.38, 0.45, 0.2, 32);
    const bellBase = new THREE.Mesh(bellBaseGeo, rubberMat);
    bellBase.position.set(-0.8, -0.7, 0);
    group.add(bellBase);

    const bellDomeGeo = new THREE.SphereGeometry(0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bellDome = new THREE.Mesh(bellDomeGeo, brassMat);
    bellDome.position.set(-0.8, -0.6, 0);
    group.add(bellDome);

    // Ground Contact Probe Tip
    const probeTipGeo = new THREE.CylinderGeometry(0.04, 0.01, 0.22, 16);
    const probeTip = new THREE.Mesh(probeTipGeo, chromeMat);
    probeTip.position.set(-0.8, -0.85, 0);
    group.add(probeTip);

    // T-Handle / Rod for technician placement
    const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16);
    const rod = new THREE.Mesh(rodGeo, chromeMat);
    rod.position.set(-0.8, -0.15, 0);
    group.add(rod);

    const tHandleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.35, 16);
    const tHandle = new THREE.Mesh(tHandleGeo, rubberMat);
    tHandle.rotation.z = Math.PI / 2;
    tHandle.position.set(-0.8, 0.25, 0);
    group.add(tHandle);

    // 2. Ultrasonic Acoustic Radiance Pulse Rings (Underwater/Subsurface Soundwaves)
    for (let w = 1; w <= 3; w++) {
      const ringGeo = new THREE.RingGeometry(0.2 * w, 0.24 * w, 32);
      const ring = new THREE.Mesh(ringGeo, waveMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(-0.8, -0.85 - w * 0.12, 0);
      group.add(ring);
      soundWavesRef.current.push(ring);
    }

    // Underground Simulated Leaking Pipe
    const pipeGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.4, 24);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.6,
      metalness: 0.4,
    });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(-0.2, -1.15, 0);
    group.add(pipe);

    // Leak fracture point (pulsing cyan glow)
    const leakPointGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const leakPointMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leakPoint = new THREE.Mesh(leakPointGeo, leakPointMat);
    leakPoint.position.set(-0.8, -1.02, 0);
    group.add(leakPoint);

    // 3. Coiled Shielded Umbilical Cable
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, -0.25, 0),
      new THREE.Vector3(-0.6, -0.4, 0.2),
      new THREE.Vector3(-0.3, -0.5, -0.1),
      new THREE.Vector3(0.0, -0.3, 0.15),
      new THREE.Vector3(0.3, -0.1, 0.05),
      new THREE.Vector3(0.55, 0.05, 0.0),
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 40, 0.025, 10, false);
    const cableMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.5 });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    group.add(cable);

    // 4. Handheld Digital Telemetry & Audio Visualizer Unit
    const unitBodyGeo = new THREE.BoxGeometry(0.65, 0.85, 0.22);
    const unitBody = new THREE.Mesh(unitBodyGeo, housingMat);
    unitBody.position.set(0.65, 0.35, 0);
    unitBody.rotation.y = -0.3;
    group.add(unitBody);

    // Rubber shock bumpers on device
    [-0.32, 0.32].forEach((bx) => {
      const bumperGeo = new THREE.BoxGeometry(0.06, 0.88, 0.24);
      const bumper = new THREE.Mesh(bumperGeo, rubberMat);
      bumper.position.set(0.65 + bx * Math.cos(-0.3), 0.35, bx * Math.sin(-0.3));
      bumper.rotation.y = -0.3;
      group.add(bumper);
    });

    // Screen
    const screenGeo = new THREE.PlaneGeometry(0.45, 0.38);
    const screen = new THREE.Mesh(screenGeo, screenGlowMat);
    screen.position.set(0.65 + 0.12 * Math.sin(0.3), 0.45, 0.12 * Math.cos(0.3));
    screen.rotation.y = -0.3;
    group.add(screen);

    // Soundwave spectrum visualizer bars inside screen
    for (let s = -4; s <= 4; s++) {
      const barHeight = 0.06 + Math.abs(s) * 0.025;
      const barGeo = new THREE.PlaneGeometry(0.025, barHeight);
      const barMat = new THREE.MeshBasicMaterial({ color: 0xa7f3d0 });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(
        0.65 + 0.125 * Math.sin(0.3) + s * 0.035 * Math.cos(-0.3),
        0.42,
        0.125 * Math.cos(0.3) - s * 0.035 * Math.sin(-0.3),
      );
      bar.rotation.y = -0.3;
      group.add(bar);
      spectrumBarsRef.current.push(bar);
    }

    // Rotary frequency/gain dials
    [-0.12, 0.12].forEach((dx) => {
      const knobGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.06, 16);
      const knob = new THREE.Mesh(knobGeo, brassMat);
      knob.rotation.x = Math.PI / 2;
      knob.rotation.y = -0.3;
      knob.position.set(0.65 + dx * Math.cos(-0.3), 0.12, 0.12 * Math.cos(0.3));
      group.add(knob);
    });

    // Ground plane reference
    const groundGeo = new THREE.BoxGeometry(3.0, 0.04, 1.8);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.8;
    group.add(ground);

    // Compute bounding box and center perfectly at (0, 0, 0)
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.position.set(-center.x, -center.y, -center.z);

    const pivot = new THREE.Group();
    pivot.add(group);
    scene.add(pivot);
    modelGroupRef.current = pivot;
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera centered on origin (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 4.3);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff7ed, 2.0);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.0);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xd4a017, 1.5, 8);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // Build requested model
    if (modelType === "hvac") {
      buildHVACModel(scene);
    } else {
      buildLeakDetectionModel(scene);
    }

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Fan rotation (HVAC)
      fanBladesRef.current.forEach((fan) => {
        fan.rotation.y += delta * 12;
      });

      // Sound wave pulsing (Leak detection)
      soundWavesRef.current.forEach((wave, idx) => {
        const scale = 1.0 + Math.sin(time * 3 + idx * 1.2) * 0.15;
        wave.scale.set(scale, scale, scale);
      });

      // Spectrum visualizer bounce (Leak detection)
      spectrumBarsRef.current.forEach((bar, idx) => {
        const scaleY = 0.5 + Math.sin(time * 8 + idx * 1.5) * 0.5;
        bar.scale.set(1, scaleY, 1);
      });

      // Model auto-rotation or damping
      if (modelGroupRef.current) {
        if (isRotating && !isDraggingRef.current) {
          currentRotationRef.current.y += 0.006;
        }

        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
        modelGroupRef.current.rotation.y = currentRotationRef.current.y;

        // Project 3D Hotspots to 2D Screen
        const hotspots = modelType === "hvac" ? HVAC_HOTSPOTS : LEAK_HOTSPOTS;
        const currentContainer = mountRef.current;
        if (currentContainer && cameraRef.current) {
          const w = currentContainer.clientWidth;
          const h = currentContainer.clientHeight;
          const innerModel = modelGroupRef.current.children[0];

          const projected = hotspots.map((hSpot) => {
            const worldPos = hSpot.position.clone();
            if (innerModel) {
              innerModel.localToWorld(worldPos);
            } else {
              modelGroupRef.current!.localToWorld(worldPos);
            }
            worldPos.project(cameraRef.current!);

            const x = (worldPos.x * 0.5 + 0.5) * w;
            const y = (-worldPos.y * 0.5 + 0.5) * h;
            const visible = worldPos.z < 1.0 && x > 20 && x < w - 20 && y > 20 && y < h - 20;

            return {
              hotspot: hSpot,
              x,
              y,
              visible,
            };
          });
          setScreenHotspots(projected);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [modelType, buildHVACModel, buildLeakDetectionModel, isRotating]);

  // Toggle wireframe mode
  const toggleWireframe = () => {
    setIsWireframe((prev) => {
      const next = !prev;
      wireframeMaterialsRef.current.forEach((mat) => {
        (mat as THREE.MeshStandardMaterial).wireframe = next;
      });
      return next;
    });
  };

  // Reset Camera View
  const resetView = () => {
    currentRotationRef.current = { x: 0.15, y: -0.5 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0.15, 4.3);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  // Mouse & Touch Orbit Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;

    currentRotationRef.current.y += deltaX * 0.008;
    currentRotationRef.current.x = Math.max(
      -0.4,
      Math.min(0.7, currentRotationRef.current.x + deltaY * 0.008),
    );

    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className={cn(
        "relative flex h-[460px] w-full flex-col overflow-hidden rounded-[20px] border border-slate-800 bg-[#0c1424] shadow-xl select-none",
        className,
      )}
    >
      {/* Subtle Studio Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,104,0.35)_0%,rgba(12,20,36,0.95)_75%)]"
      />

      {/* 3D Canvas Viewport */}
      <div
        ref={mountRef}
        className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Interactive 3D Hotspot Markers */}
      {screenHotspots.map(({ hotspot, x, y, visible }) => {
        if (!visible) return null;
        const isSelected = activeHotspot?.id === hotspot.id;

        return (
          <div
            key={hotspot.id}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
            className="pointer-events-auto absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          >
            <button
              type="button"
              onClick={() => setActiveHotspot(isSelected ? null : hotspot)}
              className={cn(
                "group relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200",
                isSelected
                  ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] scale-110"
                  : "bg-white/25 backdrop-blur-md hover:bg-white/50 hover:scale-110",
              )}
              aria-label={hotspot.name}
            >
              <span className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                isSelected ? "bg-[var(--color-navy-900)]" : "bg-white",
              )} />
            </button>
          </div>
        );
      })}

      {/* Hotspot Spec Modal */}
      {activeHotspot && (
        <div className="absolute bottom-14 left-4 right-4 z-30 mx-auto max-w-sm rounded-xl border border-white/15 bg-[var(--color-navy-900)]/95 p-3.5 text-white shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-2.5">
            <div>
              <span className="text-[0.68rem] font-medium uppercase tracking-wider text-white/50">
                Component
              </span>
              <h4 className="text-[0.95rem] font-semibold text-white">{activeHotspot.name}</h4>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-white/80">
                {activeHotspot.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveHotspot(null)}
              className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Minimalist Top Indicator */}
      <div className="pointer-events-none absolute top-3.5 left-4 z-20 flex items-center gap-2 text-[0.72rem] font-medium text-white/50">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>360° Interactive Model</span>
      </div>

      {/* Minimalist Bottom Control Dock */}
      <div className="absolute bottom-3.5 right-4 z-20 flex items-center gap-1.5 text-xs">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={cn(
            "rounded-lg px-2.5 py-1 text-[0.72rem] font-medium backdrop-blur-md transition-all duration-200",
            isRotating
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
          )}
        >
          {isRotating ? "Auto-Spin" : "Paused"}
        </button>

        <button
          type="button"
          onClick={toggleWireframe}
          className={cn(
            "rounded-lg px-2.5 py-1 text-[0.72rem] font-medium backdrop-blur-md transition-all duration-200",
            isWireframe
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
          )}
        >
          Wireframe
        </button>

        <button
          type="button"
          onClick={resetView}
          className="rounded-lg bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/60 backdrop-blur-md hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
