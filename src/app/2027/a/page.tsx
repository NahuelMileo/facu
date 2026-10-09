"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { EvidenceDesk } from "@/components/paper/Evidence";
import { Folder, PAPER_UNLOCK_MS, type AccessState } from "@/components/paper/Folder";
import { Closing, Letter } from "@/components/paper/Letter";
import { PaperChrome } from "@/components/paper/PaperChrome";
import { CommsSheet, DevelopmentSheets, FinalSheet, HistorySheet, ProfileSheet } from "@/components/paper/Sheets";

export default function PaperPage() {
  const [access, setAccess] = useState<AccessState>("locked");

  useEffect(() => {
    if (access !== "checking") return;
    const t = setTimeout(() => setAccess("granted"), PAPER_UNLOCK_MS);
    return () => clearTimeout(t);
  }, [access]);

  const unlocked = access === "granted";

  return (
    <MotionConfig reducedMotion="user">
      <PaperChrome unlocked={unlocked} />
      <main>
        <Folder state={access} onOpen={() => setAccess("checking")} />
        {unlocked && (
          <>
            <ProfileSheet />
            <HistorySheet />
            <DevelopmentSheets />
            <EvidenceDesk />
            <CommsSheet />
            <Letter />
            <FinalSheet />
            <Closing />
          </>
        )}
      </main>
    </MotionConfig>
  );
}
