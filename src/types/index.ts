import { type Icons } from '@/components/icons';
import { signUpSchema } from '@/lib/validations/auth';
import { type z } from 'zod';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
export type MainNavItem = NavItemWithOptionalChildren;

export type TSignUpSchema = z.infer<typeof signUpSchema>;
