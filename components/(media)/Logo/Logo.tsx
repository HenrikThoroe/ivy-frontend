import { SVGAttributes } from 'react'

/**
 * A SVG element for the application logo.
 *
 * Supports changing attributes of the outer `svg` component, except:
 * - `width`
 * - `height`
 * - `viewBox`
 * - `fill`
 * - `xmlns`
 */
export default function Logo(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 2.88675C22.094 1.10042 25.906 1.10042 29 2.88675L39.7846 9.11325C42.8786 10.8996 44.7846 14.2008 44.7846 17.7735V30.2265C44.7846 33.7992 42.8786 37.1004 39.7846 38.8868L29 45.1132C25.906 46.8996 22.094 46.8996 19 45.1132L8.21539 38.8868C5.12138 37.1004 3.21539 33.7992 3.21539 30.2265V17.7735C3.21539 14.2008 5.12138 10.8996 8.21539 9.11325L19 2.88675Z"
        fill="#2E412E"
      />
      <ellipse
        cx="16.2269"
        cy="22.4164"
        rx="3.69229"
        ry="9.23074"
        transform="rotate(20 16.2269 22.4164)"
        fill="#4FE828"
        fill-opacity="0.54"
      />
      <ellipse
        cx="23.8521"
        cy="25.8095"
        rx="3.69229"
        ry="9.23074"
        fill="#4FE828"
        fill-opacity="0.54"
      />
      <ellipse
        cx="31.587"
        cy="22.4167"
        rx="3.69229"
        ry="9.23074"
        transform="rotate(-20 31.587 22.4167)"
        fill="#4FE828"
        fill-opacity="0.54"
      />
    </svg>
  )
}
