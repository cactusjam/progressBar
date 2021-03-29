/* eslint-disable */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ('OSL') v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import {
    SHIPPING_STEP,
    BILLING_STEP,
    DETAILS_STEP,
} from 'Route/Checkout/Checkout.config';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './ProgressBar.style';

 export class ProgressBar extends PureComponent {
    static propTypes = {
        checkoutStep: PropTypes.oneOf([
            SHIPPING_STEP,
            BILLING_STEP,
            DETAILS_STEP
        ]).isRequired,
    }

    allSteps = [SHIPPING_STEP, BILLING_STEP, DETAILS_STEP];

    stepMap = {
        [SHIPPING_STEP]: {
            title: 'Shipping',
        },
        [BILLING_STEP]: {
            title: 'Billing',
        },
        [DETAILS_STEP]: {
            title: 'Details',
        }
    };

    renderLastBar() {
        const stepActivityClass = this.props.checkoutStep === DETAILS_STEP
            ? 'progressStepActive'
            : 'progressNonActive';
     
        return(
            <div block='ProgressBar' elem='Item' key='3'>
                <div block='ProgressBar' elem={`ActivityBar ${stepActivityClass}`} />
            </div>
        )
    }

    render() {
         return (
            <div block='ProgressBar'>
                {this.allSteps.map((step, index) => { 
                    const currentStepIndex = this.allSteps.indexOf(this.props.checkoutStep);
                    const isActive = index <= currentStepIndex;
                    // const activityPointClass = isActive ? 'blobActive' : 'blobNonActive';
                    const activityPointContent = index < currentStepIndex ? 'V' : index + 1;

                    const stepActivityClass = isActive ? 'progressStepActive' : 'progressNonActive';
                    const pointTitleClass = isActive ? 'pointTitle titleActive' : 'pointTitle titleNonActive';

                    return( 
                        <div block='ProgressBar' elem='Item' key={index}>
                            <div block='ProgressBar' elem={`ActivityBar ${stepActivityClass}`} />
                            <div block='ProgressBar' elem='ActivityPoint'>
                                <div block='ProgressBar' elem={`ActivityPointBlob ${stepActivityClass}`}>
                                    <span block='ProgressBar' elem={isActive ? 'BlobActive' : 'BlobNonActive'}>
                                        {activityPointContent}
                                    </span>
                                </div>
                                <span elem={pointTitleClass}>
                                    {this.stepMap[step].title}
                                </span>
                            </div>
                        </div>
                    )
                })}
                {this.renderLastBar()}
            </div>
         );
     }
 }

 ProgressBar.propTypes
 
 export default ProgressBar;