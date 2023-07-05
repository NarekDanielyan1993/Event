const useGetLayout = (Component, Layout) => {
    return Component.layout || Layout;
};

export default useGetLayout;
