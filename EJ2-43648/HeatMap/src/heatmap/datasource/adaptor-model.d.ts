import { HeatMap } from '../heatmap';

/**
 * Interface for a class Data
 */
export interface DataModel {

    /**
     * Specifies the provided datasource is an JSON data. 
     * @default false
     */

    isJsonData?: boolean;

    /**
     * specifies Adaptor type
     * @default None
     */
    adaptorType?: AdaptorType;

    /**
     * Specifies xAxis mapping. 
     * @default ''
     */

    xDataMapping?: string;

    /**
     * Specifies yAxis mapping. 
     * @default ''
     */

    yDataMapping?: string;

    /**
     * Specifies value mapping. 
     * @default ''
     */

    valueMapping?: string;

    /**
     * Specifies data mapping for size and color bubble type. 
     */
    bubbleDataMapping?: BubbleDataModel;

}

/**
 * Interface for a class AdaptiveMinMax
 */
export interface AdaptiveMinMaxModel {

}

/**
 * Interface for a class Adaptor
 */
export interface AdaptorModel {

}