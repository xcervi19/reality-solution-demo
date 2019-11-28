import React, { useState } from 'react';
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { factMutation } from '../graphql/facts/factMutation';
import { factQuery, TFactData } from '../graphql/facts/factQuery';

const IndexPage: NextPage = () => {

  const [formState, setFormState] = useState({ text: '' });
  const { data: FData, loading: FLoading, error: FError } = useQuery<TFactData>(factQuery, { ssr: false })
  const [sendFact, { loading: MFloading, data: MFData, error: MFError }] = useMutation(factMutation);

  return (
    <Layout title="Home | Next.js + TypeScript Example">

      <h2>Random facts</h2>
      {FLoading && <p>loading...</p>}
      {FError && <p>error...</p>}
      {!FLoading && !FError && FData && <p>{FData.fact.text}</p>}
      <hr />
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="text"
          id="text"
          type="text"
          onChange={(e) => setFormState({ text: e.target.value })}
        />
        <button
          type="button"
          onClick={() => {
            sendFact({ variables: { fact: formState } });
          }}
        >
          Odeslat
        </button><br />
        error: {JSON.stringify(MFError)} <br />
        loading: {MFloading} <br />
        data: {JSON.stringify(MFData)} <br />
      </form>


      <h1>Hello 👋</h1>
      <p>
        <Link href="/about">
          <a>About neco</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
