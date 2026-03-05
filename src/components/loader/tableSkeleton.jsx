import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableSkeleton = ({ columns, rowCount = 8 }) => {
	const renderSkeletonRow = () => (
		<tr key={Math.random().toString(36).substring(7)}>
			{columns.map((data, i) => (
				<td key={i}>
					<Skeleton height={20} width={'100%'} />
				</td>
			))}
		</tr>
	);

	return (
		<table className='table mt-2'>
			<thead>
				{/* <tr>
					{columns.map((data, i) => (
						<th key={i} style={{
							fontSize: '13px',
							color: 'rgba(0, 0, 0, 0.87)',
							fontWeight: '600',
							justifyContent: 'space-between',
							backgroundColor: 'transparent',
							borderRadius: '10px',
							marginBottom: '0px',
							height: '20px !important',
							border: 'none',
							textTransform: 'capitalize',
							padding: '10px 10px 15px',
							textAlign: 'center',
						}}>
							{data.name}
						</th>
					))}
				</tr> */}
			</thead>
			<tbody>
				{[...Array(rowCount)].map(renderSkeletonRow)}
			</tbody>
		</table>
	);
};

export default TableSkeleton;