import { StyledLogisticItem } from './style';

function LogisticsItem(props) {
    const { icon: Icon } = props;

    return (
        <StyledLogisticItem>
            <span className="icon">
                <Icon />
            </span>
            <span className="content">{props.children}</span>
        </StyledLogisticItem>
    );
}

export default LogisticsItem;
