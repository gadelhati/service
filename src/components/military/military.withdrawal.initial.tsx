import { Withdrawal } from "./military.withdrawal.interface";
import { militaryInitial } from "./military.initial";

export const withdrawalInitial: Withdrawal = {
    military: militaryInitial,
    to: new Date(),
    from: new Date(),
}