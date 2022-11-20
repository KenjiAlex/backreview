import { Controller, Post, Get, HttpCode, HttpStatus, Req, Res, UseGuards, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Controller('cost')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
     private readonly authService: AuthService
  ) {}
  
  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCosts(@Req() req, @Res() res): Promise<void> {
    return this.costsService.getAllCosts(req, res)
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token)

    return await this.costsService.create({
      ...createCostDto,
      userId: user._id as string
    })
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCost(@Body() updateCostDto: UpdateCostDto, @Param('id') id: string ) {
    return await this.costsService.update(updateCostDto, id)
  }
}
