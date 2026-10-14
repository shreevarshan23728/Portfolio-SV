import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { PROFILE } from '../../data/profile';
import { sound } from '../../utils/sound';
import { Terminal, MapPin, GraduationCap, Radio } from 'lucide-react';

// Abstract Kinetic 3D Monolith for About Section
function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { pointer } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2 + pointer.y * 0.2;
      meshRef.current.rotation.y = t * 0.3 + pointer.x * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.15;
      wireRef.current.rotation.y = t * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <group scale={1.3}>
      {/* Faceted Core Polyhedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Outer Wireframe Halo */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbital Gimbal Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export function About() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillHover = (skill: string) => {
    setActiveSkill(skill);
    sound.playHover();
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#050505] py-28 px-6 sm:px-12 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Subtle Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Pre-title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#00f0ff]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
            CHAPTER 01 // DIGITAL IDENTITY
          </span>
        </div>

        {/* Section Heading: BEYOND THE SCREEN. */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-metallic tracking-tight mb-16 leading-tight">
          {PROFILE.aboutTitle}
        </h2>

        {/* Editorial 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Philosophy & Technical Identity Panel */}
          <div className="lg:col-span-7 flex flex-col space-y-10">
            {/* Editorial Lead Paragraph */}
            <p className="text-xl sm:text-2xl font-light text-gray-200 leading-relaxed font-sans border-l-2 border-[#00f0ff] pl-6 py-1">
              {PROFILE.aboutParagraphs[0]}
            </p>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
              {PROFILE.aboutParagraphs[1]}
            </p>

            {/* Minimal Technical Identity Panel */}
            <div className="luxury-card rounded-xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Terminal size={14} className="text-[#00f0ff]" />
                  SPECIFICATION // PROFILE METRICS
                </span>
                <span className="text-[10px] font-mono text-[#00f0ff] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                  AUTHENTICATED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">NAME</span>
                  <span className="text-gray-200 font-medium">{PROFILE.name}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px]">DISCIPLINE</span>
                  <span className="text-gray-200 font-medium">Artificial Intelligence & Data Science</span>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <GraduationCap size={12} className="text-gray-400" />
                    INSTITUTION
                  </span>
                  <span className="text-gray-200">{PROFILE.metadata.institution}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <MapPin size={12} className="text-gray-400" />
                    LOCATION
                  </span>
                  <span className="text-gray-200">{PROFILE.metadata.location}</span>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-gray-400">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Radio size={12} className="text-[#00f0ff]" />
                    AVAILABILITY
                  </span>
                  <span className="text-[#00f0ff] font-semibold text-[11px] uppercase tracking-wider">
                    {PROFILE.metadata.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Interactive 3D Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent shadow-2xl flex items-center justify-center">
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
                <pointLight position={[-3, -2, 2]} intensity={2.0} color="#00f0ff" />
                <pointLight position={[3, 2, -2]} intensity={1.5} color="#8a2be2" />
                <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
                  <AbstractGeometry />
                </Float>
              </Canvas>

              {/* Holographic Visual Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 pointer-events-none">
                <span>INTERACTIVE TOPOLOGICAL MANIFOLD</span>
                <span className="text-[#00f0ff]">SYS // 3D-KINETIC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section — Elegant Interactive Text Elements (NO BADGES) */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#00f0ff] block mb-2">
                DOMAINS & PROFICIENCIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-wide">
                CORE CAPABILITIES
              </h3>
            </div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              HOVER TO ENGAGE TELEMETRY // 8 VECTORS
            </p>
          </div>

          {/* Elegant Interactive Typography Grid (Strictly Avoids Rounded Colored Badges) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILE.skillsList.map((skill, index) => {
              const isHovered = activeSkill === skill;
              const idxStr = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={skill}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className={`group relative p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'border-[#00f0ff] bg-white/[0.04] shadow-[0_0_25px_rgba(0,240,255,0.15)] -translate-y-1'
                      : 'border-white/[0.08] bg-white/[0.015] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-gray-500 group-hover:text-[#00f0ff] transition-colors">
                    <span>VECTOR // {idxStr}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">● ACTIVE</span>
                  </div>

                  <div className="text-lg font-mono font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
                    {skill}
                  </div>

                  {/* Subtle hairline glow on active */}
                  <div
                    className={`mt-4 h-[1px] w-full transition-all duration-300 ${
                      isHovered ? 'bg-gradient-to-r from-[#00f0ff] to-transparent' : 'bg-white/5'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
