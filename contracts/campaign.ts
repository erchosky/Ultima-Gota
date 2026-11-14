/** Contratos de diseño. No son validadores ejecutables ni una API implementada. */
export type ChapterId = `UG-${string}`;
export type SkillId = `S${string}`;
export type KnowledgeKind = 'observed' | 'historical' | 'hypothesis' | 'limitation';
export type ChapterState = 'locked' | 'available' | 'in-progress' |
  'behavior-demonstrated' | 'understanding-checked' | 'completed';
export interface ImplementationState {
  designed: boolean;
  contentWritten: boolean;
  functionalScenario: boolean;
  validatorTested: boolean;
  fullFlowVerified: boolean;
}
export interface Skill {
  id: SkillId;
  introducedIn: ChapterId;
  action: string;
  guidedPractice: ChapterId[];
  independentApplication: ChapterId[];
  terminalIntegration: boolean;
}
export interface Hint {
  id: string;
  level: 1 | 2 | 3 | 4;
  type: 'concept' | 'zone' | 'action' | 'explicit-guide';
  text: string;
}
export interface Evidence {
  id: string;
  chapterId: ChapterId;
  campaignId: string;
  generation: number;
  runId: string;
  scenarioVersion: number;
  virtualTime: string;
  identity: string;
  resource: string;
  requestRefs: string[];
  expected: string;
  observed: string;
  kind: KnowledgeKind;
}
export interface CheckpointPolicy {
  policy: string;
  restore: string;
  preserve: string[];
  requiredArtifacts: string[];
}
export interface Chapter {
  id: ChapterId;
  campaignCaseId: 'UG-001';
  act: number;
  title: string;
  location: string;
  narrativeTime: string;
  sender: string;
  prerequisites: ChapterId[];
  reusedSkills: { skillId: SkillId; introducedIn: ChapterId; observableUse: string; practiceContext: string }[];
  newSkill: { id: SkillId; action: string };
  narrativeEntry: string;
  whyItMatters: string;
  learningObjective: string;
  scenarioVersion: number;
  fixtures: string[];
  allowedAccounts: string[];
  predictionQuestion: string;
  guidedSteps: string[];
  hintIds: [string, string, string, string];
  evidenceRequirements: { id: string; fields: string[]; resource: string; observation: string };
  debrief: string;
  understandingCheck: { question: string; responseType: 'structured-choice-with-explanation' };
  nextNarrativeArtifact: { id: string; label: string; recipient: string };
  checkpointPolicy: CheckpointPolicy;
  implementation: ImplementationState;
}
export interface Scenario {
  id: string;
  version: number;
  kind: 'design-plan';
  implementation: 'not-implemented';
  isolationProfile: 'chapter-copy' | 'historical-copy' | 'regression-copy';
  initialState: {
    fixtureRef: string;
    overrideRef: string;
    accounts: string[];
    resource: string;
    resetBeforeAttempt: boolean;
  };
  successValidator: {
    kind: 'planned-server-observation';
    contract: string;
    mustMatch: string[];
    execution: 'pending';
  };
  falsePositiveChecks: string[];
  patchVerification: { change: string; positive: string; negative: string; execution: 'pending' };
  resetAndRecovery: CheckpointPolicy;
}
export interface ValidationResult {
  chapterId: ChapterId;
  campaignId: string;
  generation: number;
  runId: string;
  status: 'pending' | 'observed' | 'demonstrated' | 'understood' | 'patch-verified' | 'failed';
  evidenceIds: string[];
  checks: { id: string; passed: boolean; explanation: string }[];
  limitation?: string;
}

/** Proyección futura explícita. Nunca enviar Chapter o Scenario enteros al navegador. */
export interface StudentChapterView {
  id: ChapterId;
  title: string;
  sender: string;
  narrativeEntry: string;
  learningObjective: string;
  predictionQuestion: string;
  guidedSteps: string[];
  requestedHints: Hint[];
  state: ChapterState;
  understandingQuestion?: string;
  unlockedDebrief?: string;
}
