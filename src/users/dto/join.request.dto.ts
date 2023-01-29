import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
    @ApiProperty({
        example: 'email@email.com',
        description: '이메일',
        required: true,
    })
    public email: string;

    @ApiProperty({
        example: 'pooreumu',
        description: '닉네임',
        required: true,
    })
    public nickname: string;

    @ApiProperty({
        example: 'weopf33q3ffj',
        description: '비밀번호',
        required: true,
    })
    public password: string;
}
