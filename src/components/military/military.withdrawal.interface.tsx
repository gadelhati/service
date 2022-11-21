import { Military } from "./military.interface";

export interface Withdrawal {
    military: Military,
    to: Date,
    from: Date,
}