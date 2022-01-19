import { IService } from "../../interfaces/service.interface";
require('dotenv').config()

export let Notion: IService = {
	name: "Notion",
	id: parseInt(process.env.NOTION),
	icon: "https://img.icons8.com/ios/500/notion.png"
}
