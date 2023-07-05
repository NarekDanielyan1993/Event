import Image from 'next/image';

import AddressIcon from 'components/icons/address-icon';
import DateIcon from 'components/icons/date-icon';
import { loadImage, transformToLocalDate } from 'utils';

import LogisticsItem from '../event-logistic-item';

import { StyledLogistics } from './style';

function EventLogistics(props) {
    const { date, address, imageId, imageAlt } = props;

    const humanReadableDate = transformToLocalDate(date);

    const addressText = address.replace(', ', '\n');

    return (
        <StyledLogistics>
            <div className="image">
                <Image
                    alt={imageAlt}
                    height={400}
                    loader={loadImage}
                    objectFit="cover"
                    src={imageId}
                    width={400}
                />
            </div>
            <ul className="list">
                <LogisticsItem icon={DateIcon}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={AddressIcon}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ul>
        </StyledLogistics>
    );
}

export default EventLogistics;
