import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WalletRepositoryDomain } from 'src/domain/repositories/wallets.interface';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class WalletsRepository implements WalletRepositoryDomain {
  constructor(private readonly prismaService: PrismaService) {}

  async wallet(
    walletsWhereUniqueInput: Prisma.WalletsWhereUniqueInput,
  ): Promise<{
    id: number;
    userId: number;
    balance: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return this.prismaService.wallets.findUnique({
      where: walletsWhereUniqueInput,
    });
  }

  async wallets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletsWhereUniqueInput;
    where?: Prisma.WalletsWhereInput;
    orderBy?: Prisma.WalletsOrderByWithRelationInput;
  }): Promise<
    {
      id: number;
      userId: number;
      balance: Prisma.Decimal;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.wallets.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWallet(data: Prisma.WalletsCreateInput): Promise<{
    id: number;
    userId: number;
    balance: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return this.prismaService.wallets.create({ data });
  }

  async updateWallet(params: {
    where: Prisma.WalletsWhereUniqueInput;
    data: Prisma.WalletsUpdateInput;
  }): Promise<{
    id: number;
    userId: number;
    balance: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const { where, data } = params;
    return this.prismaService.wallets.update({ where, data });
  }

  async deleteWallet(where: Prisma.WalletsWhereUniqueInput): Promise<{
    id: number;
    userId: number;
    balance: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return this.prismaService.wallets.delete({ where });
  }
}