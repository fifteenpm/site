import React from 'react';
import OverlayEnterButton from './OverlayEnterButton';
import OverlayInstructions from './OverlayInstructions';
import OverlayPurchaseLink from './OverlayPurchaseLink';
import OverlayMessage from './OverlayMessage';
import './OverlayContent.css';

/**
*  Renders content inside react modal
*    - description of artists
*    - instructions
*    - action button
*/
export default function OverlayContent({
    instructions,
    purchaseLink,
    message,
    color,
    onToggle,
    }) {
    return (
        <div className="overlay-content">
            <div className="overlay-header-and-controls">
                <OverlayMessage message={message} color={color} />
                {instructions && <OverlayInstructions instructions={instructions} color={color} />}
                {purchaseLink && <OverlayPurchaseLink href={purchaseLink} color={color} />}
            </div>
            <OverlayEnterButton
                color={color}
                onClick={onToggle}  
            />
        </div>
    );
}