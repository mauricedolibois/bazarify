import React from 'react'
import FormInput from './FormInput'

export default function () {
    return (
        <>
            <div>
                <h1>1. Basar erstellen</h1>
                <p>Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden Basar festhalten.</p>
            </div>
            <div>
                <div class="grid grid-cols-1 gap-x-8 sm:grid-cols-6">
                    <FormInput name="Name des Basars" unit="" />
                    <FormInput name="Jahr" unit="" />
                    <FormInput name="Provision" unit="%" />

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Beschreibung</label>
                        <div class="mt-2">
                            <textarea placeholder="Eine kurze optionale Beschreibung des geplanten Basars" id="about" name="about" rows="3" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" class="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save</button>
                </div>
            </div>
        </>
    )
}