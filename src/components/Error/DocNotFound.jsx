import { MdErrorOutline } from 'react-icons/md'; // Material Design icon
import { useRouter } from 'next/router';

const DocNotFound = ({ BackBtn }) => {
    const router = useRouter();
    return (
        <div className="d-flex justify-content-center align-items-center flex-column text-center mt-4">
            <div className="alert alert-danger w-auto rounded-4 shadow-sm mb-0">
                <MdErrorOutline className="text-danger" size={64} />
                <h4 className="mb-2 mt-md-3 mt-3">Doctor Not Found</h4>
                <p className="mb-0">We couldn't find the doctor you're looking for!</p>
            </div>
            {
                BackBtn &&
                <button
                    className="button-primary my-4"
                    onClick={() => router.back()}
                >
                    <span>Go Back</span>
                </button>
            }
        </div>
    )
}

export default DocNotFound
