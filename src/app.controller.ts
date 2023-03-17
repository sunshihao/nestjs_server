import {
  Controller,
  Get,
  Req,
  Post,
  Header,
  Redirect,
  Query,
  Param,
  HostParam,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll2() {
    return 'This route uses a wildcard';
  }

  // 重定向 多个query的情况
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // 路由参数
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  async create11(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
}

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  // @Put()、@Delete()、@Patch()、@Options()、以及 @Head()。此外，@All() 则用于定义一个用于处理所有 HTTP 请求方法的处理程序
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findAll2() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}

// 子路由域
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }

  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  // @Get()
  // findAll1(): Observable<any[]> {
  //   return of([]);
  // }
}
