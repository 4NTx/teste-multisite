import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Site])],
    providers: [SiteService],
    controllers: [SiteController],
    exports: [SiteService]
})
export class SiteModule { }
