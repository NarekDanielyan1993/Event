import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import Loader from 'components/loader';
import { usePaginatedEvents } from 'services/event';
import EventList from '../event/event-list';
import EventListContainer from '../event/event-list/event-list-container';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            aria-labelledby={`event-category-tab-${index}`}
            id={`event-category-tabpanel-${index}`}
            role="tabpanel"
            {...other}
        >
            {index === value && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `event-category-tab-${index}`,
        'aria-controls': `event-category-tabpanel-${index}`,
    };
}

export default function EventContent({
    deleteEventHandler,
    updateEventHandler,
    setCategory,
    category,
    filterData,
    setFilterData,
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const {
        data: eventData,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        sentinelRef,
    } = usePaginatedEvents(category, filterData, true);

    const handleChange = async (event, newValue) => {
        setCategory(newValue);
        setFilterData('');
    };

    return (
        <>
            <Tabs
                allowScrollButtonsMobile
                centered
                onChange={handleChange}
                TabIndicatorProps={{
                    hidden: !matches,
                }}
                value={category}
            >
                {eventData &&
                    eventData?.labels.map((label, index) => {
                        return (
                            <Tab
                                key={label}
                                label={label}
                                {...a11yProps(index)}
                            />
                        );
                    })}
            </Tabs>
            {isLoading ? (
                <Loader />
            ) : (
                <CustomTabPanel index={category} value={category}>
                    <EventListContainer>
                        <EventList
                            items={eventData?.data}
                            onDeleteEvent={deleteEventHandler}
                            onUpdateEvent={updateEventHandler}
                        />
                    </EventListContainer>
                </CustomTabPanel>
            )}
            <Typography ref={sentinelRef}>
                {isFetchingNextPage && hasNextPage && 'Loading...'}
            </Typography>
        </>
    );
}
