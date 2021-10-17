import React from 'react';
import { IBreadcrumbItem, Breadcrumb } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  source: IBreadcrumbItem[];
  className?: string;
}

const BreadcrumbUI = (props: UIProps) => {
  return (
    <span className={`w-100 ${props?.className ?? ''} nate-team-breadcrumb-css`}>
      <Breadcrumb
        items={props.source}
        maxDisplayedItems={10}
        overflowAriaLabel="More links"
        styles={{ chevron: { color: '#fff' } }}
      />
    </span>
  );
};

export default BreadcrumbUI;
