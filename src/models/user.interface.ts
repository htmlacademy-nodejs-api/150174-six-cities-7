type UserType = 'plain' | 'pro';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  type: UserType;
}

export type { User, UserType };
