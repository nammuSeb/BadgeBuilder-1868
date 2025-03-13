export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuedDate: Date;
  expiryDate?: Date;
  criteria: string;
  issuer: {
    name: string;
    url: string;
    email: string;
  };
  recipient: {
    identity: string;
    type: 'email' | 'url';
    hashed: boolean;
  };
  verification: {
    type: 'hosted' | 'signed';
    url: string;
  };
  skills: string[];
}

export interface BadgeTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  skills: string[];
}

export interface IssuedBadge extends Badge {
  recipientId: string;
  issuerId: string;
  status: 'active' | 'revoked' | 'expired';
  shareHistory: {
    platform: 'linkedin' | 'twitter' | 'facebook';
    sharedAt: Date;
  }[];
}