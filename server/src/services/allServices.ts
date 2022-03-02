import { IService } from 'src/interfaces/service.interface';
import { notion } from './entities/Notion/notion.class';
import { discord } from './entities/Discord/discord.class';
import { intra } from './entities/Intra/Intra.class';
import { AddToDB } from './entities/Notion/actions/AddToDB';
import { SendMessage } from './entities/Discord/reactions/SendMessage';
import { ReceiveMessage } from './entities/Discord/actions/ReceiveMessage';
import { googleCalendar } from './entities/GoogleCalendar/googleCalendar.class';
import { CreateEvent } from './entities/GoogleCalendar/reactions/CreateEvent';
import { GPAChanges } from './entities/Intra/actions/GPAChanges';
import { NewNotification } from './entities/Intra/actions/NewNotification';

export let allServices: IService[] = [];
allServices.push(notion);
allServices.push(discord);
allServices.push(intra);
allServices.push(googleCalendar);

const actionsMap = {
	//NOTION
	"Add to database": AddToDB,

	//DISCORD
	"Receive a message": ReceiveMessage,

	//INTRA
	"GPA changes": GPAChanges,
	"New notification": NewNotification
}

const reactionsMap = {
	//DISCORD
	"Send a message": SendMessage,
	"Create an event": CreateEvent,

}

/*
	Now you may ask, what is this magic you are doing ?
	Well let me explain ---
	
	I create a map that has :
		a Key -> string
		a Value -> Class that inherits ATrigger
		
	I create a type for the keys of this Map called actionKeys
	I use this type to create a Tuple<T> that checks if T is safely assignable to an actionKey :
		True -> Tuple<T> = [T, typeof actionsMap[T]]
			Example: If T = "Add To database" then Tuple<"Add to database"> = ["Add to database", AddToDB]
		False -> Tuple<T> = never

	I isolate a single key from the map with another ternary
	And then Isolate the actuel classType
		Extract = extracts the types in the actionTuples that are assignabled to Tuple<A>(A, any)>
		This maps a key to the corresponding instance type meaning when I build "Add to database" it is mapped to the class AddToDB

	The factory is just taking these types and building the corresponding class
	I use ConstructorParameters to obtain the constructor parameters in a tuple of the corresponding class
	Meaning I can then build the class with any form of parameters
*/
type ActionsMap = typeof actionsMap;
export type actionKeys = keyof ActionsMap;
type actionTuples<T> = T extends actionKeys ? [T, InstanceType<ActionsMap[T]>] : never;
type actionSingleKeys<K> = [K] extends (K extends actionKeys ? [K] : never) ? K : never;
type actionClassType<A extends actionKeys> = Extract<actionTuples<actionKeys>, [A, any]>[1];

export class ActionsFactory {
	static buildTask<K extends actionKeys>(k: actionSingleKeys<K>, ...params: ConstructorParameters<ActionsMap[actionKeys]>): actionClassType<K> {
		return new actionsMap[k](...params);
	}
}

type ReactionMap = typeof reactionsMap;
export type reactionKeys = keyof typeof reactionsMap;
type reactionTuples<T> = T extends reactionKeys ? [T, InstanceType<ReactionMap[T]>] : never;
type reactionSingleKeys<K> = [K] extends (K extends reactionKeys ? [K] : never) ? K : never;
type reactionClassType<A extends reactionKeys> = Extract<reactionTuples<reactionKeys>, [A, any]>[1];

export class ReactionsFactory {
	static buildTask<K extends reactionKeys>(k: reactionSingleKeys<K>, ...params: ConstructorParameters<ReactionMap[reactionKeys]>): reactionClassType<K> {
		return new reactionsMap[k](...params);
	}
}
