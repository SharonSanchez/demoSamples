import { Property, ChildProperty, Complex, Browser, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Interface for a class LegendSettings
 */
export interface LegendSettingsModel {

    /**
     * Specifies the height of Legend.
     * @default ''
     */
    height?: string;

    /**
     * Specifies the width of Legend.
     * @default ''
     */
    width?: string;

    /**
     * Specifies title of Legend.
     * @default ''
     */
    title?: TitleModel;

    /**
     * Specifies the position of Legend to render.
     * @default 'Right'
     */
    position?: LegendPosition;

    /**
     * Specifies whether the Legend should be visible or not.
     * @default true
     */
    visible?: boolean;

    /**
     * Specifies the alignment of the legend
     * @default 'Center'
     */
    alignment?: Alignment;

    /**
     * Specifies whether the label should be visible or not.
     * @default true
     */
    showLabel?: boolean;

    /**
     * Specifies whether the gradient pointer should be visible or not.
     * @default true
     */
    showGradientPointer?: boolean;

    /**
     * Specifies whether smart legend should be displayed or not when palette type is fixed.
     * @default false
     */
    enableSmartLegend?: boolean;

    /**
     * Specifies the type of label display for smart legend.
     * * All:  All labels are displayed.
     * * Edge: Labels will be displayed only at the edges of the legend.
     * * None: No labels are displayed.
     * @default 'All'
     */
    labelDisplayType?: LabelDisplayType;

    /**
     * Specifies the legend label style.
     * @default ''
     */
    textStyle?: FontModel;

    /**
     * Specifies the formatting options for the legend label.
     * @default ''
     */

    labelFormat?: string;

    /**
     * To toggle the visibility of heatmap cells based on legend range selection
     * @default true
     */
    toggleVisibility?: boolean;

}

/**
 * Interface for a class Legend
 */
export interface LegendModel {

}