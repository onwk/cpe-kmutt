import { Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, cn) => {
      const types = file.mimetype.split('/')[1];
      cn(null, uuidv4() + `.${types}`);
    },
  }),
};

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return of({ imagePath: file.path });
  }
}
