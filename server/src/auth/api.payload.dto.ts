import { ApiProperty } from "@nestjs/swagger";

export class LoginApiDTO {
    @ApiProperty({
        type: String,
        description: "Email"
    })
    email!: string;

    @ApiProperty({
        type: String,
        description: "Password"
    })
    password!: string;
}

export class IntraTokenDTO {
    @ApiProperty({
        type: String,
        description: "Autologin link"
    })
    link!: string
}