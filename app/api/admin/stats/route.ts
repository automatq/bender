import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get total revenue
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
    });

    // Get revenue by month (last 6 months)
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push({
        start: startOfMonth(date),
        end: endOfMonth(date),
        label: format(date, 'MMM yyyy'),
      });
    }

    const revenueByMonth = await Promise.all(
      months.map(async (month) => {
        const result = await prisma.payment.aggregate({
          where: {
            status: 'completed',
            createdAt: {
              gte: month.start,
              lte: month.end,
            },
          },
          _sum: {
            amount: true,
          },
        });

        return {
          month: month.label,
          revenue: result._sum.amount || 0,
        };
      })
    );

    // Get project stats
    const projectStats = await prisma.project.groupBy({
      by: ['status'],
      _count: true,
    });

    // Get total projects
    const totalProjects = await prisma.project.count();

    // Get total clients
    const totalClients = await prisma.user.count({
      where: {
        role: 'client',
      },
    });

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.amount || 0,
      revenueByMonth,
      projectStats,
      totalProjects,
      totalClients,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
