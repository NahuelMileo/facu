"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { Assessment } from "@/components/sections/Assessment";
import { Chrome } from "@/components/sections/Chrome";
import { CommLog } from "@/components/sections/CommLog";
import { Developments } from "@/components/sections/Developments";
import { EvidenceArchive } from "@/components/sections/EvidenceArchive";
import { FinalAssessment } from "@/components/sections/FinalAssessment";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Timeline } from "@/components/sections/Timeline";
import { UNLOCK_DURATION, UnlockSequence } from "@/components/sections/UnlockSequence";

type AccessState = "locked" | "checking" | "granted";

export default function Page() {
  const [access, setAccess] = useState<AccessState>("locked");

  // Hide the file until clearance is granted.
  useEffect(() => {
    if (access !== "checking") return;
    const t = setTimeout(() => setAccess("granted"), UNLOCK_DURATION);
    return () => clearTimeout(t);
  }, [access]);

  // Once granted, drop straight into the file.
  useEffect(() => {
    if (access !== "granted") return;
    const t = setTimeout(() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" }), 450);
    return () => clearTimeout(t);
  }, [access]);

  const unlocked = access === "granted";

  return (
    <MotionConfig reducedMotion="user">
      <Chrome unlocked={unlocked} />
      <main>
        <Hero state={access} onAccess={() => setAccess("checking")} />
        {unlocked && (
          <>
            <Profile />
            <Timeline />
            <Developments />
            <EvidenceArchive />
            <CommLog />
            <Assessment />
            <FinalAssessment />
          </>
        )}
      </main>
      <AnimatePresence>{access === "checking" && <UnlockSequence />}</AnimatePresence>
    </MotionConfig>
  );
}
