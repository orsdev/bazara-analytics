import { ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface OptionalChildrenProps {
  children?: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface BaseComponentProps extends ChildrenProps, ClassNameProps {}

export enum Teams {
  INNOVATION_PIONEERS = 'Innovation Pioneers',
  TECH_TRAILBLAZERS = 'Tech Trailblazers',
  VISIONARY_VANGUARD = 'Visionary Vanguard',
  DYNAMIC_DEVELOPERS = 'Dynamic Developers',
  STRATEGIC_SPARKS = 'Strategic Sparks',
  CREATIVE_CATALYSTS = 'Creative Catalysts',
  PRECISION_TASKFORCE = 'Precision Taskforce',
  UNITY_ENGINEERS = 'Unity Engineers',
  AGILE_ACHIEVERS = 'Agile Achievers',
  SYNERGY_SQUAD = 'Synergy Squad',
  NONE = 'None'
}
