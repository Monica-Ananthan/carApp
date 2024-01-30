import React from 'react';
import { Link } from 'react-router-dom';

interface Logo {
    id: number;
    model: string;
    location: string;
    color: string;
    owner: string;
    manufactureYear: string;
    transmission: string;
    insuranceValidity: string;
    externalFitments: string;
    kms: string;
    photo: string;
}

interface FormDataProps {
    formData: Logo[];
}

const FormDataTableComponent: React.FC<FormDataProps> = ({ formData }) => {

    if (!formData || formData.length === 0) {
        return (
            <div className='mt-4 border p-4'>
                <h5>List Table</h5>
                <p>No data available</p>
            </div>
        );
    }

    return (
        <div className='mt-4 border p-3'>
            <div className='row'>
                <div className='col-12 col-md-9'>
                    <h5 className='text-start'>List Table</h5>
                </div>
                <div className='col-12 col-md-3'>
                    <Link to="/view" className='btn btn-primary mb-3'>
                        View Page
                    </Link>
                </div>
            </div>
            <table className='table table-bordered mt-2'>
                <thead>
                    <tr>
                        {Object.keys(formData[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(data).map((key, colIndex) => (
                                <td key={colIndex}>{data[key as keyof Logo]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormDataTableComponent;