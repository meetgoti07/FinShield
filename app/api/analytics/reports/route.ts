import { NextResponse } from 'next/server';
import { format } from 'date-fns';

export async function GET() {
    try {
        // Current date is Sunday, March 30, 2025
        const currentDate = new Date(2025, 2, 30);

        // Generate report data based on the current date
        const reports = [
            {
                id: '1',
                title: 'Monthly Fraud Summary',
                date: format(currentDate, 'MMMM yyyy'),
                type: 'fraud-summary'
            },
            {
                id: '2',
                title: 'Quarterly Risk Assessment',
                date: `Q${Math.ceil((currentDate.getMonth() + 1) / 3)} ${currentDate.getFullYear()}`,
                type: 'risk-assessment'
            },
            {
                id: '3',
                title: 'Fraud Pattern Analysis',
                date: format(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15), 'MMMM yyyy'),
                type: 'pattern-analysis'
            },
            {
                id: '4',
                title: 'Geographic Risk Report',
                date: format(currentDate, 'MMMM yyyy'),
                type: 'geographic-risk'
            }
        ];

        return NextResponse.json(reports);
    } catch (error) {
        console.error('Error generating reports data:', error);
        return NextResponse.json({ error: 'Failed to generate reports data' }, { status: 500 });
    }
}
