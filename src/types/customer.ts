import { AllPament, AllPamentForm } from "./payment";

export interface Customer {
  name: string;
  payment: AllPament;
  isVerified: boolean;
}

export interface CustomerForm {
    name?: string
    payment?: AllPamentForm
    isVerified?: boolean
}