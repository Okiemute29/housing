import { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import TextAreaInput from '../../components/TextAreaInput';
import ToggleInput from '../../components/ToggleInput';
import RadioInput from '../../components/RadioInput';
import FileInput from '../../components/FileInput';
import UploadedImageThumb from '../../components/UploadedImageThumb';
import { useField } from 'formik';

import validationSchema from './validationSchema';
import initialValues from './initalValues';
import { submitListingData, deleteSelectedImage } from './createListingFunctions';

function CreateListing() {
  const [imageThumbs, setImageThumbs] = useState([]);
  const [typeAccomodation, setTypeAccomodation] = useState('Single Room')
  const [area, setArea] = useState('Ekosodin')
  // const [field, meta] = useField(props);
  const navigate = useNavigate();

  const onDropHanlder = (acceptedFiles, setFieldValue) => {
    setImageThumbs(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    setFieldValue('images', acceptedFiles);
  };

  const onSubmit = async (values) => {
    values.bedrooms = typeAccomodation
    values.bathrooms = area
    const listingId = await submitListingData(values);
    console.log(listingId)
    if (listingId) {
      navigate(`/listing/${listingId}`);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Create listing</h1>
        <div className="max-w-3xl mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ isSubmitting, values, resetForm, setFieldValue }) => {
              return (
                <Form className="space-y-4">
                  <div>
                    <span id="listing-type">Listing type</span>
                    <div
                      role="group"
                      aria-labelledby="listing-type"
                      className="grid grid-cols-2 gap-9 max-w-md">
                      <RadioInput
                        id="forSale"
                        label="For roommate"
                        name="type"
                        value="sale"
                        checked={values.type === 'sale'}
                      />
                      <RadioInput
                        id="forRent"
                        label="For rent"
                        name="type"
                        value="rent"
                        checked={values.type === 'rent'}
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput label="Title" id="title" name="title" type="text" />
                  </div>
                  <div>
                    <TextAreaInput label="Description" id="description" name="description" />
                  </div>
                  <div>
                    <TextAreaInput label="Address" id="address" name="address" />
                    {/* <div className="inline-block mt-2">
                      <ToggleInput
                        label="Enter geolocation manually"
                        id="customGeolocationEnabled"
                        name="customGeolocationEnabled"
                      />
                    </div> */}
                  </div>
                  {values.customGeolocationEnabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <TextInput
                          label="Latitude"
                          id="latitude"
                          name="geolocation.latitude"
                          type="text"
                        />
                      </div>
                      <div>
                        <TextInput
                          label="Longitude"
                          id="longitude"
                          name="geolocation.longitude"
                          type="text"
                        />
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <div>
                      {/* <TextInput
                        label="No. of bedrooms"
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="1"
                      /> */}
                      <label htmlFor='bedrooms' className="label">
                        Type of Accomodation
                      </label>
                      <select value={typeAccomodation} onChange={(e)=> setTypeAccomodation(e.target.value)} id="bedrooms" name="bedrooms" className={`input input-bordered w-full `}>
                        <option>Single Room</option>
                        <option>Self Contain</option>
                        <option>Two Bedroom</option>
                      </select>
                    </div>
                    <div>
                      {/* <TextInput
                        label="No. of bathrooms"
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        min="1"
                      /> */}
                      <label htmlFor='bathrooms' className="label">
                        Area
                      </label>
                      <select value={area} onChange={(e)=> setArea(e.target.value)} id="bathrooms" name="bathrooms" className={`input input-bordered w-full `}>
                        <option>Ekosodin</option>
                        <option>BDPA</option>
                        <option>Osasogie</option>
                      </select>
                    </div>
                    {/* <div>
                      <TextInput
                        label="Car space"
                        id="carspace"
                        name="carspace"
                        value='1'
                        type="number"
                        min="0"
                      />
                    </div> */}
                    <div>
                      <TextInput
                        label=" Distance sch(mins)"
                        id="listingSize"
                        name="listingSize"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput
                      label="Price (in Naira)per year"
                      id="regularPrice"
                      name="regularPrice"
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
                    <FileInput
                      maxSize={2097152}
                      accept="image/jpg, image/png, image/jpeg"
                      onDrop={(acceptedFiles) => onDropHanlder(acceptedFiles, setFieldValue)}
                      dropZoneText="Select images (Max file size: 2MB)"
                      id="images"
                      name="images"
                      label="Upload listing images (.jpg, .png)"
                    />
                    {imageThumbs.length > 0 && (
                      <ul className="flex items-center justify-start flex-wrap gap-4 mt-4">
                        {imageThumbs.map((file) => (
                          <li key={uuidv4()} className="flex-shrink-0 relative w-24 h-24">
                            <UploadedImageThumb
                              src={file.preview}
                              onClick={() =>
                                deleteSelectedImage(
                                  imageThumbs,
                                  file.path,
                                  setFieldValue,
                                  setImageThumbs
                                )
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="btn btn-neutral btn-block mt-3 mx-0"
                      onClick={() => resetForm()}
                      disabled={isSubmitting}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary md:mt-3 btn-block mx-0"
                      disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default CreateListing;
