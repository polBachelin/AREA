import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { IUser, User, userSchema } from "../models/User";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";

const mockUser = (
	email = "pol.bachelin@epitech.eu",
	password = "",
	areas = [],
	discord = {access_token: "No more token", token_type: "Bearer", expires_in: 604800, refresh_token: "", scope: "email"},
	google = undefined,
	notion = undefined,
	intra = undefined,
): User => ({
	email,
	password,
	areas,
	discord,
	google,
	notion,
	intra
})

const mockUserDoc = (mock?: Partial<User>): Partial<IUser> => ({
	email: mock?.email || "pol.bachelin@epitech.eu",
	password: mock?.password || "",
	areas: mock?.areas || [],
})

const userArray = [
	mockUser()
]

const userDocArray = [
	mockUserDoc()
]

describe('ServiceController', () => {
	let serviceService: ServicesService;
	let model: Model<IUser>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ServicesService,
				{
					provide: getModelToken('User'),
					useValue: {
						new: jest.fn().mockResolvedValue(mockUser()),
						constructor: jest.fn().mockResolvedValue(mockUser()),
						find: jest.fn(),
						findOne: jest.fn(),
						update: jest.fn(),
						create: jest.fn(),
						remove: jest.fn(),
						exec: jest.fn()
					},
				},
				UsersService
			],
		}).compile();
		serviceService = module.get<ServicesService>(ServicesService);
		model = module.get<Model<IUser>>(getModelToken('User'));
	});
	
	it('should be defined', () => {
		expect(serviceService).toBeDefined();
	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return logged services', async () => {
		jest.spyOn(model, 'find').mockReturnValue({
			exec: jest.fn().mockResolvedValueOnce(userDocArray),
		} as any);
		const users = await serviceService.getLoggedInServices("pol.bachelin@epitech.eu")	
	})
})