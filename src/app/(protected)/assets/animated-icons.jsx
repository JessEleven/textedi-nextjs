export const AnimatedCompassIcon = (props) => (
  <svg
    width={72}
    height={72}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <style>
      {
        '@keyframes rotate{0%{transform:rotateZ(0)}to{transform:rotateZ(90deg)}}'
      }
    </style>
    <g
      style={{
        animation:
          'rotate 3s cubic-bezier(.7,-.03,.43,.72) both infinite alternate-reverse',
        transformOrigin: 'center center'
      }}
    >
      <path
        stroke='#2E2C5D'
        strokeWidth={1}
        d='M12 20a8 8 0 100-16 8 8 0 000 16z'
      />
      <path
        fill='#76380E'
        fillRule='evenodd'
        d='M14.246 9.033l-.516 3.97-3.18 2.431a.5.5 0 01-.8-.461l.516-3.97 3.18-2.431a.5.5 0 01.8.461zM12 13a1 1 0 100-2 1 1 0 000 2z'
        clipRule='evenodd'
      />
    </g>
  </svg>
)
