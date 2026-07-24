import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. KISIM: Sadece Objenin Kendisi (Matematik ve Fizik)
function KnotMesh() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Hedef rengimizi belirliyoruz (Hover durumuna göre Mor veya Koyu Gri)
  const targetColor = new THREE.Color(hovered ? '#7426B0' : '#111111');

  useFrame((state, delta) => {
    // Kendi etrafında sürekli dönme animasyonu
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    
    // YENİ: Renkler arası aniden atlamak yerine "lerp" ile yumuşakça süzülme efekti
    meshRef.current.material.color.lerp(targetColor, delta * 2);
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={1} // Sabit boyut
    >
      <torusKnotGeometry args={[0.9, 0.3, 128, 32]} />
      {/* Başlangıç rengini veriyoruz, gerisini useFrame içindeki lerp halledecek */}
      <meshStandardMaterial roughness={0.1} metalness={0.8} color="#111111" />
    </mesh>
  );
}

// 2. KISIM: Sahnenin Tamamı (Kamera, Işık ve Test Alanı)
export default function InfinityKnot() {
  return (
    // YENİ: height '100vh' yerine '100%' yapıldı ki eklendiği kutuya tam otursun.
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <KnotMesh />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
