import { Prisma, PrismaClient } from '@prisma/client';
import { AnnualReport, Report } from './report.model';
import { Decimal } from '@prisma/client/runtime/library';
// import calculateIncomeStatus from '../../shared/utils/calculateTotal';

class ReportService {
  private prisma: PrismaClient = new PrismaClient();

  protected async getReportGlobal(year: number): Promise<AnnualReport> {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const report: AnnualReport = {
      Enero: null,
      Febrero: null,
      Marzo: null,
      Abril: null,
      Mayo: null,
      Junio: null,
      Julio: null,
      Agosto: null,
      Setiembre: null,
      Octubre: null,
      Noviembre: null,
      Diciembre: null,
    };

    for (let i = 0; i < 12; i++) {
      const sale = await this.prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(year, i, 1),
            lt: new Date(year, i + 1, 1),
          },
        },
        select: {
          totalAmount: true,
          id: true,
          codeSale: true,
          admin: {
            select: {
              id: true,
              fullName: true,
              documentType: true,
              documentNumber: true,
              email: true,
              phone: true,
            },
          },
          client: {
            select: {
              id: true,
              fullName: true,
              documentType: true,
              documentNumber: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      if (sale.length > 0) {
        const totalSold = sale.reduce(
          (sum, venta) => sum.add(venta.totalAmount),
          new Decimal(0)
        );

        report[months[i]] = {
          totalSold,
          sale,
        };
      }
    }

    return report;
  }

  protected async getReportByAdmin(
    year: number,
    adminId: number
  ): Promise<AnnualReport> {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const report: AnnualReport = {
      Enero: null,
      Febrero: null,
      Marzo: null,
      Abril: null,
      Mayo: null,
      Junio: null,
      Julio: null,
      Agosto: null,
      Setiembre: null,
      Octubre: null,
      Noviembre: null,
      Diciembre: null,
    };

    for (let i = 0; i < 12; i++) {
      const sale = await this.prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(year, i, 1),
            lt: new Date(year, i + 1, 1),
          },
          adminId,
        },
        select: {
          totalAmount: true,
        },
      });

      if (sale.length > 0) {
        const totalSold = sale.reduce(
          (sum, venta) => sum.add(venta.totalAmount),
          new Decimal(0)
        );

        report[months[i]] = {
          totalSold,
        };
      }
    }

    return report;
  }

  protected async getReportByClient(
    year: number,
    clientId: number
  ): Promise<AnnualReport> {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const report: AnnualReport = {
      Enero: null,
      Febrero: null,
      Marzo: null,
      Abril: null,
      Mayo: null,
      Junio: null,
      Julio: null,
      Agosto: null,
      Setiembre: null,
      Octubre: null,
      Noviembre: null,
      Diciembre: null,
    };

    for (let i = 0; i < 12; i++) {
      const sale = await this.prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(year, i, 1),
            lt: new Date(year, i + 1, 1),
          },
          clientId,
        },
        select: {
          totalAmount: true,
        },
      });

      if (sale.length > 0) {
        const totalSold = sale.reduce(
          (sum, venta) => sum.add(venta.totalAmount),
          new Decimal(0)
        );

        report[months[i]] = {
          totalSold,
        };
      }
    }

    return report;
  }

  protected async getReportByBusiness(
    year: number,
    businessId: number
  ): Promise<AnnualReport> {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const report: AnnualReport = {
      Enero: null,
      Febrero: null,
      Marzo: null,
      Abril: null,
      Mayo: null,
      Junio: null,
      Julio: null,
      Agosto: null,
      Setiembre: null,
      Octubre: null,
      Noviembre: null,
      Diciembre: null,
    };

    for (let i = 0; i < 12; i++) {
      const sales = await this.prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(year, i, 1),
            lt: new Date(year, i + 1, 1),
          },
          saleBusiness: {
            some: {
              businessId,
            },
          },
        },
        select: {
          id: true,
          codeSale: true,
          totalAmount: true,
          saleBusiness: {
            select: {
              quantity: true,
              business: {
                select: {
                  product: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  investment: true,
                  initialStock: true,
                  stock: true,
                  statusBusiness: true,
                },
              },
            },
          },
        },
      });

      if (sales.length > 0) {
        const totalSold = sales.reduce(
          (sum, sale) => sum.add(sale.totalAmount),
          new Decimal(0)
        );

        const totalInvested = sales.reduce((sum, sale) => {
          const investment = sale.saleBusiness.reduce((subSum, sb) => {
            return subSum.add(
              sb.business.investment.mul(sb.business.initialStock)
            );
          }, new Decimal(0));
          return sum.add(investment);
        }, new Decimal(0));

        const incomeStatus: 'Ganancia' | 'Recuperado' | 'Perdida' =
          totalSold.greaterThan(totalInvested)
            ? 'Ganancia'
            : totalSold.equals(totalInvested)
            ? 'Recuperado'
            : 'Perdida';

        report[months[i]] = {
          totalSold,
          totalInvested,
          incomeStatus,
          sale: sales,
        };
      }
    }

    return report;
  }

  protected async getReportForDownload(
    year: number,
    month?: number,
    clientId?: number,
    adminId?: number,
    businessId?: number
  ): Promise<Report> {
    const whereClause: Prisma.SaleWhereInput = {
      createdAt: {
        gte: new Date(year, month ? month - 1 : 0, 1),
        lt: new Date(year, month ? month : 12, 1),
      },
    };

    if (clientId) {
      whereClause.clientId = clientId;
    }

    if (adminId) {
      whereClause.adminId = adminId;
    }

    if (businessId) {
      whereClause.saleBusiness = {
        some: {
          businessId,
        },
      };
    }

    const sales = await this.prisma.sale.findMany({
      where: whereClause,
      select: {
        id: true,
        codeSale: true,
        totalAmount: true,
        admin: {
          select: {
            id: true,
            fullName: true,
            documentType: true,
            documentNumber: true,
            email: true,
            phone: true,
          },
        },
        client: {
          select: {
            id: true,
            fullName: true,
            documentType: true,
            documentNumber: true,
            email: true,
            phone: true,
          },
        },
        saleBusiness: {
          select: {
            business: {
              select: {
                id: true,
                codeBusiness: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                initialStock: true,
                stock: true,
                statusBusiness: true,
              },
            },
            quantity: true,
          },
        },
      },
    });

    const report: Report = {
      totalSold: new Decimal(0),
      sale: [],
    };

    sales.forEach((sale) => {
      report.totalSold = report.totalSold.add(sale.totalAmount);

      const saleEntry = {
        id: sale.id,
        codeSale: sale.codeSale,
        totalAmount: sale.totalAmount,
        admin: sale.admin,
        client: sale.client,
        saleBusiness: sale.saleBusiness.map((sb) => ({
          business: sb.business,
          quantity: sb.quantity,
        })),
      };

      report.sale?.push(saleEntry);
    });

    return report;
  }

  protected async getReportForDownloadBusiness(
    businessId: number
  ): Promise<Report> {
    const sales = await this.prisma.sale.findMany({
      where: {
        saleBusiness: {
          some: {
            businessId,
          },
        },
      },
      select: {
        id: true,
        codeSale: true,
        totalAmount: true,
        saleBusiness: {
          select: {
            quantity: true,
            business: {
              select: {
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                investment: true,
                initialStock: true,
                stock: true,
                statusBusiness: true,
              },
            },
          },
        },
      },
    });

    const totalSold = sales.reduce(
      (sum, sale) => sum.add(sale.totalAmount),
      new Decimal(0)
    );

    const totalInvested = sales.reduce((sum, sale) => {
      const investment = sale.saleBusiness.reduce((subSum, sb) => {
        return subSum.add(sb.business.investment.mul(sb.business.initialStock));
      }, new Decimal(0));
      return sum.add(investment);
    }, new Decimal(0));

    const incomeStatus: 'Ganancia' | 'Recuperado' | 'Perdida' =
      totalSold.greaterThan(totalInvested)
        ? 'Ganancia'
        : totalSold.equals(totalInvested)
        ? 'Recuperado'
        : 'Perdida';

    const report = {
      totalSold,
      totalInvested,
      incomeStatus,
      sale: sales,
    };

    return report;
  }

  /* * AREA ADMIN * */
  protected async getAdminById(
    id: number
  ): Promise<{ fullName: string } | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
        statusUser: 'Activo',
        status: 'Habilitado',
      },
      select: {
        fullName: true,
      },
    });

    return admin ? admin : null;
  }

  /* * AREA CLIENT * */
  protected async getClientById(
    id: number
  ): Promise<{ fullName: string } | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
      select: {
        fullName: true,
      },
    });

    return client ? client : null;
  }

  /* * AREA BUSINESS * */
  protected async getBusinessById(
    id: number
  ): Promise<{ codeBusiness: string } | null> {
    const business = await this.prisma.business.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
      select: {
        codeBusiness: true,
      },
    });

    return business ? business : null;
  }
}

export default ReportService;
