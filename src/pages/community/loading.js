import SkeletonLoader from '../../component/skeleton';
import './community.css';
import './home.css';

const CommunityLoading = ({ idx }) => {

    return (
        <li key={`feed-${idx}`} className='feed-li feed-li-loading'>
            <div className='fl-top'>
                <div className='flt-img'><SkeletonLoader /></div>
                <div className='flt-poster'><SkeletonLoader /></div>
                <div className='flt-time'><SkeletonLoader /></div>
            </div>
            <div className='fl-mid'>
                <div className='fl-mid-txt'><SkeletonLoader /></div>
            </div>
            <div className='fl-base'>
                <div className='flb-left'><SkeletonLoader /></div>
                <div className='flb-right'>
                    <div className='flb-votes'><SkeletonLoader /></div>
                </div>
            </div>
        </li>
    );
};

export default CommunityLoading;