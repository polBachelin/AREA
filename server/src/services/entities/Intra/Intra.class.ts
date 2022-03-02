import { IService } from "src/interfaces/service.interface";

export class Intra implements IService {
    id: number;
    name: string;
    icon: string;
    actions: string[];
    reactions: string[];
    
    constructor() {
        this.name = "Intra",
        this.id = parseInt(process.env.INTRA_EPITECH),
        this.icon = "https://w1.pngwing.com/pngs/993/450/png-transparent-science-organization-epitech-logo-computer-science-school-toulouse-lyon.png"
        this.actions = ["GPA changes", "New notification"];
        this.reactions = [""];
    }
}

let intra = new Intra()
export { intra }