const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`animate-pulse bg-light-grey rounded-std ${className}`} />
    );
};

export default Skeleton;
