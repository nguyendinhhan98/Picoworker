export enum ROLES {
  IS_ADMIN = 'ADMIN',
  IS_WORKER = 'WORKER',
  IS_EMPLOYER = 'EMPLOYER',
}

export enum REGIST_ROLES {
  WORKER = 'WORKER',
  EMPLOYER = 'EMPLOYER',
}

export enum JWTConfig {
  JWT_SECRET = 'PICOWORKER',
  JWT_EXPIRES_IN = '3600s',
}

export enum JobLevel {
  STARTER = 'Starter',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

export enum ProofType {
  TEXT = 'Text Proof',
  SCREEN = 'Screenshot Proof',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TargetZone {
  INTERNATIONAL = 'International',
  ASIA = 'Asia',
  USA_WESTERN = 'USA Western',
  AFRICA = 'Africa',
  EUROPE_WEST = 'Europe West',
  MUSLIM_COUNTRIES = 'Muslim Countries',
  EUROPE_EAST = 'Europe East',
  LATIN_AMERICA = 'Latin America',
}
