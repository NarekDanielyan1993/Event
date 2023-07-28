import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/system';
import Loader from 'components/loader';
import { useErrorBoundary } from 'react-error-boundary';
import { useGetEvents } from 'services/event';
import EventList from '../event/event-list';

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
    eventData,
    deleteEventHandler,
    updateEventHandler,
    setEvents,
    setCategory,
    category,
}) {
    const { isLoading, getEvents } = useGetEvents();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { showBoundary } = useErrorBoundary();

    const handleChange = async (event, newValue) => {
        try {
            setCategory(newValue);
            const allEvents = await getEvents();
            setEvents(allEvents);
        } catch (error) {
            showBoundary(error);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '60%', margin: '0 auto' }}>
            <Tabs
                centered
                onChange={handleChange}
                TabIndicatorProps={{
                    hidden: !matches,
                }}
                value={category}
            >
                {eventData.map((category, index) => {
                    return (
                        <Tab
                            key={category.label}
                            label={category.label}
                            {...a11yProps(index)}
                        />
                    );
                })}
            </Tabs>
            {isLoading ? (
                <Loader />
            ) : (
                eventData.map((event, index) => {
                    return (
                        <CustomTabPanel
                            index={index}
                            key={event.label}
                            value={category}
                        >
                            <EventList
                                items={event.data}
                                onDeleteEvent={deleteEventHandler}
                                onUpdateEvent={updateEventHandler}
                            />
                        </CustomTabPanel>
                    );
                })
            )}
        </Box>
    );
}
