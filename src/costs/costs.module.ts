import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Cost, CostSchema } from 'src/schemas/costs.schema';
import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Cost.name, schema: CostSchema}]),
    AuthModule,
  ],
  controllers: [CostsController],
  providers: [CostsService]
})
export class CostsModule {}
