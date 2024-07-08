const OwnerCard = ({owner}: { owner: any }) => {
    return (
        <div className="bg-amber-200 border shadow m-2 rounded">
            <p>{owner?.email}</p>
        </div>
    );
};


export default OwnerCard;