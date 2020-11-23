import { createElement, Property, Complex, ChildProperty, isNullOrUndefined, select } from '@syncfusion/ej2-base';

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Custom template to format the ToolTip content.
     * @default ''
     */
    template?: string;

    /**
     * Specifies the color collection for heat map cell. 
     * @default ''
     */
    fill?: string;

    /**
     * Specifies the cell border style. 
     * @default ''
     */
    border?: TooltipBorderModel;

    /**
     * Specifies the cell label style. 
     * @default ''
     */
    textStyle?: FontModel;

}

/**
 * Interface for a class Tooltip
 */
export interface TooltipModel {

}