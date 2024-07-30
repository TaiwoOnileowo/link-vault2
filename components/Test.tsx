"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
} from "@react-three/drei";
import Vault from "./Vault";

const Models = () => {
  return (
    <div className=" md:w-full relative">
      <div className="w-[500px] mt-2  h-[500px] object-contain inset-0 m-auto ">
        <Canvas shadows camera={{ position: [4, 2.5, 8], fov: 35 }}>
          <group>
            <Center>
              <Vault rotation={[-0.3, -0.9, -0.1]} scale={1.2} />
              <AccumulativeShadows
                temporal
                frames={100}
                color="blue"
                colorBlend={2}
                toneMapped={true}
                alphaTest={0.75}
                opacity={2}
                scale={12}
              >
                <RandomizedLight
                  intensity={Math.PI}
                  amount={8}
                  radius={4}
                  ambient={0.5}
                  position={[5, 5, -10]}
                  bias={0.001}
                />
              </AccumulativeShadows>
            </Center>
          </group>
          <OrbitControls
            // minPolarAngle={0}
            // maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={5}
            enableRotate={true}
          />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
};

export default Models;
