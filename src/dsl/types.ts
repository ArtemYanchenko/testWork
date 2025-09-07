export type DSLVersion = "1.0";
export type ChartType = 'linear' | 'area' | 'bar';
export type GridUnits = number;

export type ChartMetricRef = {
    key: string;
    displayName?: string;
    unit?: string;
    format?: string;
};

export type ChartLayout = {
    col: number;
    row: number;
    w: GridUnits;
    h: GridUnits;
};

export type ChartOptions = {
    lineInterpolation?: string;
    stacked?: boolean;
    legend?: boolean;
    grid?: boolean;
};

export type ChartConfig = {
    id: string;
    title: string;
    type: ChartType;
    colorScheme: string[];
    metrics: ChartMetricRef[];
    layout?: ChartLayout;
    width?: GridUnits;
    height?: GridUnits;
    options?: ChartOptions;
};

export type Section = {
    id: string;
    title?: string;
    gapY?: number;
    charts: ChartConfig[];
};

export type Dashboard = {
    version: DSLVersion;
    id: string;
    title: string;
    grid: {
        columns: number;
        rowHeightPx: number;
        columnGap: number;
        rowGap: number;
    };
    sections: Section[];
    theme?: {
        defaultColorSchemes?: {
            linear?: string[];
            area?: string[];
            bar?: string[];
        };
        background?: {
            page?: string;
            card?: string;
        };
        typography?: {
            fontFamily?: string;
        };
    };
    meta?: Record<string, unknown>;
};

export type DataPacket = {
    time: string;
    metrics: Array<Record<string, number>>;
};
